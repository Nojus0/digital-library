import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Book = {
  __typename?: 'Book';
  id: Scalars['Int'];
  name: Scalars['String'];
  imageUrl: Scalars['String'];
  description: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register?: Maybe<UserResponse>;
  signOut: Scalars['Boolean'];
  login?: Maybe<UserResponse>;
  borrow?: Maybe<Book>;
  addBook?: Maybe<Book>;
  uploadimage?: Maybe<Scalars['Boolean']>;
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationBorrowArgs = {
  id: Scalars['Int'];
};


export type MutationAddBookArgs = {
  name: Scalars['String'];
  imageUrl: Scalars['String'];
  description: Scalars['String'];
};


export type MutationUploadimageArgs = {
  img: Scalars['Upload'];
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  books?: Maybe<Array<Book>>;
  book?: Maybe<Book>;
  bookIds?: Maybe<Array<Scalars['Int']>>;
  usernames?: Maybe<Array<Scalars['String']>>;
  userProfile?: Maybe<User>;
  images: Scalars['String'];
};


export type QueryBooksArgs = {
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBookArgs = {
  id: Scalars['Int'];
};


export type QueryUserProfileArgs = {
  username: Scalars['String'];
};

export enum Role {
  Consumer = 'Consumer',
  Administrator = 'Administrator'
}


export type User = {
  __typename?: 'User';
  username: Scalars['String'];
  role?: Maybe<Role>;
  borowing?: Maybe<Array<Book>>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user?: Maybe<User>;
  error?: Maybe<Scalars['String']>;
};

export type AddBookMutationVariables = Exact<{
  name: Scalars['String'];
  imageUrl: Scalars['String'];
  description: Scalars['String'];
}>;


export type AddBookMutation = (
  { __typename?: 'Mutation' }
  & { addBook?: Maybe<(
    { __typename?: 'Book' }
    & Pick<Book, 'id'>
  )> }
);

export type BooksQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type BooksQuery = (
  { __typename?: 'Query' }
  & { books?: Maybe<Array<(
    { __typename?: 'Book' }
    & Pick<Book, 'id' | 'name' | 'imageUrl' | 'description'>
  )>> }
);

export type BorrowMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type BorrowMutation = (
  { __typename?: 'Mutation' }
  & { borrow?: Maybe<(
    { __typename?: 'Book' }
    & Pick<Book, 'id'>
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'error'>
  )> }
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register?: Maybe<(
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'error'>
  )> }
);

export type CurrentRoleQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentRoleQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'role'>
  )> }
);

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'signOut'>
);

export type UsernameQueryVariables = Exact<{ [key: string]: never; }>;


export type UsernameQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'role'>
  )> }
);


export const AddBookDocument = gql`
    mutation addBook($name: String!, $imageUrl: String!, $description: String!) {
  addBook(name: $name, imageUrl: $imageUrl, description: $description) {
    id
  }
}
    `;

export function useAddBookMutation() {
  return Urql.useMutation<AddBookMutation, AddBookMutationVariables>(AddBookDocument);
};
export const BooksDocument = gql`
    query books($page: Int, $limit: Int) {
  books(page: $page, limit: $limit) {
    id
    name
    imageUrl
    description
  }
}
    `;

export function useBooksQuery(options: Omit<Urql.UseQueryArgs<BooksQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<BooksQuery>({ query: BooksDocument, ...options });
};
export const BorrowDocument = gql`
    mutation borrow($id: Int!) {
  borrow(id: $id) {
    id
  }
}
    `;

export function useBorrowMutation() {
  return Urql.useMutation<BorrowMutation, BorrowMutationVariables>(BorrowDocument);
};
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    error
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation register($username: String!, $password: String!, $email: String!) {
  register(username: $username, email: $email, password: $password) {
    error
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const CurrentRoleDocument = gql`
    query currentRole {
  currentUser {
    role
  }
}
    `;

export function useCurrentRoleQuery(options: Omit<Urql.UseQueryArgs<CurrentRoleQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CurrentRoleQuery>({ query: CurrentRoleDocument, ...options });
};
export const SignOutDocument = gql`
    mutation signOut {
  signOut
}
    `;

export function useSignOutMutation() {
  return Urql.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument);
};
export const UsernameDocument = gql`
    query username {
  currentUser {
    username
    role
  }
}
    `;

export function useUsernameQuery(options: Omit<Urql.UseQueryArgs<UsernameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UsernameQuery>({ query: UsernameDocument, ...options });
};