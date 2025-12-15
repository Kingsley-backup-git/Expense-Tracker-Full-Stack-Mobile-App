import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/home.styles";
import { COLORS } from "../constants/color";
import dayjs from "dayjs";
// import { formatDate } from "../lib/utils";

// Map categories to their respective icons
const CATEGORY_ICONS: any = {
  "Food & Drinks": "fast-food",
  Shopping: "cart",
  Transportation: "car",
  Entertainment: "film",
  Bills: "receipt",
  Income: "cash",
  Other: "ellipsis-horizontal",
};

export const TransactionItem = ({
  item,
  onDelete,
  success,
}: {
  success: boolean;
  onDelete: (id: string) => void;
  item: {
    _id: string;
    name: string;
    category: string;
    amount: number;
    createdAt: Date;
  };
}) => {
  const isIncome = item?.amount > 0;
  const iconName = CATEGORY_ICONS[item?.category] || "pricetag-outline";

  if (success)
    return (
      <View style={styles.transactionCard} key={item._id}>
        <TouchableOpacity style={styles.transactionContent}>
          <View style={styles.categoryIconContainer}>
            <Ionicons
              name={iconName}
              size={22}
              color={isIncome ? COLORS.income : COLORS.expense}
            />
          </View>
          <View style={styles.transactionLeft}>
            <Text style={styles.transactionTitle}>{item?.name}</Text>
            <Text style={styles.transactionCategory} numberOfLines={1}>
              {item?.category}
            </Text>
          </View>
          <View style={styles.transactionRight}>
            <Text
              style={[
                styles.transactionAmount,
                { color: isIncome ? COLORS.income : COLORS.expense },
              ]}
            >
              {isIncome ? "+" : "-"}${Math.abs(item?.amount).toFixed(2)}
            </Text>
            <Text style={styles.transactionDate}>
              {dayjs(item?.createdAt).format("DD/MM/YY")}
            </Text>
            <Text style={styles.transactionDate}>
              {dayjs(item?.createdAt).format("hh:mm a")}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(item?._id)}
        >
          <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
        </TouchableOpacity>
      </View>
    );
};
