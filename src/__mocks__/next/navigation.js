// __mocks__/next/navigation.js
export const useRouter = jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
  }));
  