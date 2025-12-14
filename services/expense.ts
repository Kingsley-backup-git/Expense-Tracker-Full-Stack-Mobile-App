import { authInstance } from "../utils/axios"

export class ExpenseService {
    getTransaction = async (id: string) => {
        try {
 const res = await authInstance.get(`/api/transactions/${id}`)

      
       return res?.data
        } catch (err:any) {
       throw new Error(err?.message)
        }
       
    }

       getSummary = async (id: string) => {
        try {
 const res = await authInstance.get(`/api/summary/${id}`)

      
       return res?.data
        } catch (err:any) {
            console.log(err?.message)
        }
       
    }



       deleteExpense = async (id: string) => {
        try {
 const res = await authInstance.delete(`/api/deleteTransaction/${id}`)

      console.log(res)
       return res?.data
        } catch (err:any) {
            console.log(err?.message)
        }
       
    }
}