import { View, Text, ScrollView, RefreshControl } from "react-native";
import { styles } from "../styles/home.styles";
import { COLORS } from "../constants/color";

export const BalanceCard = ({
  summaryData,
  summaryRefetch,
  summaryPending,
  success,
}: {
  summaryData: {
    _id: string;
    balance: number;
    expense: number;
    income: string;
  };
  summaryRefetch: any;
  summaryPending: boolean;
  success: boolean;
}) => {
  async function RefreshData() {
    await summaryRefetch();
  }
  if (success && summaryData)
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl onRefresh={RefreshData} refreshing={summaryPending} />
        }
      >
        <View style={styles.balanceCard}>
          <Text style={styles.balanceTitle}>Total Balance</Text>
          <Text style={styles.balanceAmount}>
            ${summaryData?.balance?.toFixed(2)}
          </Text>
          <View style={styles.balanceStats}>
            <View style={styles.balanceStatItem}>
              <Text style={styles.balanceStatLabel}>Income</Text>
              <Text
                style={[styles.balanceStatAmount, { color: COLORS.income }]}
              >
                +${parseFloat(summaryData?.income).toFixed(2)}
              </Text>
            </View>
            <View style={[styles.balanceStatItem, styles.statDivider]} />
            <View style={styles.balanceStatItem}>
              <Text style={styles.balanceStatLabel}>Expenses</Text>
              <Text
                style={[styles.balanceStatAmount, { color: COLORS.expense }]}
              >
                -${Math.abs(summaryData?.expense).toFixed(2)}
              </Text>
            </View>
          </View>

          {summaryData?.balance < 0 && (
            <Text style={{ marginTop: 10, fontSize: 11, color: "grey" }}>
              You&apos;re spending more than you earn
            </Text>
          )}
        </View>
      </ScrollView>
    );
};
