import sql from "../config/db.js";

export async function getTransactionByUserId(req, res) {
  const { userId } = req.params;
  try {
    const transactions = await sql`
      SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC;
    `;
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createTransaction(req, res) {
  const { user_id, title, amount, category } = req.body;
  try {
    if (!user_id || !title || amount === undefined || !category) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await sql`
      INSERT INTO transactions (user_id, title, amount, category)
      VALUES (${user_id}, ${title}, ${amount}, ${category})
      RETURNING *;
    `;
    res.status(201).json(result[0]);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteTransaction(req, res) {
  const { id } = req.params;
  try {
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ error: "Invalid transaction ID" });
    }

    const result = await sql`
      DELETE FROM transactions WHERE id = ${id} RETURNING *;
    `;
    if (result.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getTransactionSummary(req, res) {
  const { userId } = req.params;
  try {
    // calculate total and total by category
    const balanceResult = await sql`
      SELECT 
        COALESCE(SUM(amount), 0) AS total_balance
      FROM transactions
      WHERE user_id = ${userId};
    `;

    const incomeResult = await sql`
      SELECT 
        COALESCE(SUM(amount), 0) AS total_income
      FROM transactions
      WHERE user_id = ${userId} AND amount > 0;
    `;

    const expenseResult = await sql`
      SELECT 
        COALESCE(SUM(amount), 0) AS total_expense
      FROM transactions
      WHERE user_id = ${userId} AND amount < 0;
    `;

    res.status(200).json({
      balance: parseFloat(balanceResult[0].total_balance),
      income: parseFloat(incomeResult[0].total_income),
      expenses: parseFloat(expenseResult[0].total_expense),
    });
  } catch (error) {
    console.error("Error fetching summary:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
