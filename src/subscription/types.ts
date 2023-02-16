export type UpdateSubscriptionPayload = {
  departments?: number[];
  vendors?: number[];
  categories?: number[];
  insights?: number[];
};

export type DeleteSubscriptionPayload = UpdateSubscriptionPayload;
