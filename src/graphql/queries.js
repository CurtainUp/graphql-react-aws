// eslint-disable
// this is an auto generated file. This will be overwritten

export const getReceipt = `query GetReceipt($id: ID!) {
  getReceipt(id: $id) {
    id
    userId
    userAmount
    matchAmount
    nonProfitName
  }
}
`;
export const listReceipts = `query ListReceipts(
  $filter: ModelReceiptFilterInput
  $limit: Int
  $nextToken: String
) {
  listReceipts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      userAmount
      matchAmount
      nonProfitName
    }
    nextToken
  }
}
`;
