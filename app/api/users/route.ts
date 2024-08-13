import axios from "axios";
import { User } from "@/app/types";
import { NextRequest, NextResponse } from "next/server";

class API {
  url: string;
  constructor(baseURL: string) {
    this.url = baseURL;
  }
  getUsers() {
    return axios.get(this.url + "/users").then(({ data }) => data);
  }
}

const api = new API("https://jsonplaceholder.typicode.com");

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");

  return api.getUsers().then((data) => {
    if (query) {
      const filterData = data.filter((user: User) => {
        return user.username.toLowerCase().includes(query.toLowerCase());
      });
      return NextResponse.json(filterData);
    } else {
      return NextResponse.json(data);
    }
  });
}
