export type UpdateSubscriptionPayload = {
  departments?: number[];
  vendors?: number[];
  categories?: number[];
};

export type DeleteSubscriptionPayload = UpdateSubscriptionPayload;
