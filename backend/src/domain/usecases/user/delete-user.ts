
export interface IDeleteUserUseCase {
  delete: (userId: string) => Promise<void>
}
