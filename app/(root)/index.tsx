import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExpenseService } from "../../services/expense";
import { useUser } from "@clerk/clerk-expo";
import { styles } from "../../styles/home.styles";
import Logo from "../../assets/images/expenseLogo.png";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SignOutButton } from "../../components/SignOutBtn";
import { BalanceCard } from "../../components/BalanceCard";
import { TransactionItem } from "../../components/TransactionItem";
import NoTransactionsFound from "../../components/NoTransactionFound";
import { COLORS } from "../../constants/color";
const Home = () => {
  const { user } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isSuccess, isPending, isRefetching, refetch, isLoading } =
    useQuery({
      queryKey: ["transactions"],
      queryFn: async () =>
        await new ExpenseService().getTransaction(user?.id as string),
      enabled: !!user?.id,
    });

  const {
    data: summaryData,
    isSuccess: summarySuccess,
    isPending: summaryPending,
    isRefetching: summaryRefetching,
    isLoading: summaryLoading,
    refetch: summaryRefetch,
  } = useQuery({
    queryKey: ["summary"],
    queryFn: async () =>
      await new ExpenseService().getSummary(user?.id as string),
    enabled: !!user?.id,
  });
  const onRefresh = async () => {
    await refetch();
  };

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      return await new ExpenseService().deleteExpense(id);
    },
    onMutate: () => console.log("loading"),
    onSuccess() {
      Alert.alert("Deleted Transaction", "Successfully deleted transaction", [
        {
          text: "Okay",
          style: "cancel",
        },
      ]);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError(err) {},
  });
  async function DeleteHandler(id: string) {
    return await mutation.mutateAsync(id);
  }
  const pending = summaryPending || isPending || isLoading || summaryLoading;
  return (
    <View style={styles.container}>
      {pending ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.content}>
            {/* HEADER */}
            <View style={styles.header}>
              {/* LEFT */}
              <View style={styles.headerLeft}>
                <Image
                  source={Logo}
                  alt=""
                  style={styles.headerLogo}
                  resizeMode="contain"
                />

                <View style={styles.welcomeContainer}>
                  <Text style={styles.welcomeText}>Welcome,</Text>
                  <Text numberOfLines={1} style={styles.usernameText}>
                    {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
                  </Text>
                </View>
              </View>

              {/* RIGHT */}
              <View style={styles.headerRight}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => router.push("/create")}
                >
                  <Ionicons name="add" size={20} color="#FFF" />
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
                <SignOutButton />
              </View>
            </View>

            <BalanceCard
              summaryData={summaryData}
              summaryRefetch={summaryRefetch}
              summaryPending={summaryRefetching}
              success={summarySuccess}
            />

            <View style={styles.transactionsHeaderContainer}>
              <Text style={styles.sectionTitle}>Recent Transactions</Text>
            </View>
          </View>

          <FlatList
            style={styles.transactionsList}
            contentContainerStyle={styles.transactionsListContent}
            data={data}
            renderItem={({ item }) => (
              <TransactionItem
                item={item}
                onDelete={DeleteHandler}
                success={isSuccess}
              />
            )}
            ListEmptyComponent={<NoTransactionsFound />}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
            }
          />
        </View>
      )}
    </View>
  );
};

export default Home;
