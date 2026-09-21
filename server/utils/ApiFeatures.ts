import qs from "qs";
import { Query } from "mongoose";
import { Request } from "express";

interface QueryString {
  page?: string;
  sort?: string;
  fields?: string;
  limit?: string;
  search?: string;
  [key: string]: unknown;
}

class ApiFeatures {
  query: Query<unknown[], unknown>;
  queryString: QueryString;

  constructor(query: Query<unknown[], unknown>, req: Request) {
    this.query = query;
    this.queryString = (req.queryFilter || req.query) as QueryString;
  }

  filter(): this {
    const queryObj = { ...qs.parse(this.queryString) };
    const excludedField = ["page", "sort", "fields", "limit", "search"];

    excludedField.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  search(): this {
    if (this.queryString.search) {
      const searchTerm = this.queryString.search;
      this.query = this.query.find({
        name: { $regex: searchTerm, $options: "i" },
      });
    }
    return this;
  }

  sort(): this {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields(): this {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate(): this {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default ApiFeatures;