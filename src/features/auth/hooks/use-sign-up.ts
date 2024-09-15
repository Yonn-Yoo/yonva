import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<(typeof client.api.users)['$post']>;
type RequestType = InferRequestType<(typeof client.api.users)['$post']>['json'];

export const useSignUp = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.users.$post({ json });
      if (response.status === 400) {
        throw new Error('Email already in use');
      } else if (!response.ok) {
        throw new Error('Sorry, Something went wrong🥲');
      }

      return await response.json();
    },
    onError: (error) => {
      toast.error(error.message || 'Sign up failed');
    },
    onSuccess: () => {
      toast.success('User created');
    },
  });

  return mutation;
};
