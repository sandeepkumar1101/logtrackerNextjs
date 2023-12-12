import { sql } from "@vercel/postgres";
import { User, FormatedLog } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchCardData() {
  try {
    noStore();
    const data = await fetch(
      `${process.env.LOG_API_URL}/api/v1/logs/totalLogs`
    ).then((res) => res.json());

    // get total no of user using sql query
    const count = await sql`SELECT COUNT(*) FROM users`;

    const response = {
      numberOfLogs: data,
      numberOfUsers: count.rows[0].count,
    } as {
      numberOfLogs: number;
      numberOfUsers: number;
    };
    return response;
  } catch (err) {
    console.error("api Error:", err);
    throw new Error("Failed to card data.");
  }
}

const ITEMS_PER_PAGE = 8;

export async function fetchLogs(
  query: {
    message?: string;
    level?: string;
    resourceId?: string;
    traceId?: string;
    spanId?: string;
    commit?: string;
    parentResourceId?: string;
  },
  currentPage: number
) {
  try {
    noStore();
    let queryStr = "?";
    for (const key in query) {
      if (query[key as keyof typeof query]) {
        queryStr += `${key}=${query[key as keyof typeof query]}&`;
      }
    }
    const logs = await fetch(
      `${process.env.LOG_API_URL}/api/v1/logs/filter${queryStr}pageNumber=${currentPage}&pageSize=${ITEMS_PER_PAGE}`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
    return logs as { data: FormatedLog[]; length: number; totalPage: number };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * from USERS where email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}
