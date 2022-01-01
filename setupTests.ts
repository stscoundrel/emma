// Mock current time to et expected expiration times
jest.useFakeTimers('modern');
jest.setSystemTime(new Date(2022, 1, 1, 1, 1, 1, 1));
