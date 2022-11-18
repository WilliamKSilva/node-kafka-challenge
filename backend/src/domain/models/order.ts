
export enum Status {
  pending = 'PENDING',
  completed = 'COMPLETED'
}

export interface OrderModel {
  id: string
  status: Status
  name: string
  description: string
}
