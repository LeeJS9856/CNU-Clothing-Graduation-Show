export type Device = 'mobile' | 'desktop';

export interface ResponsiveValue<T> {
  mobile: T;
  desktop: T;
}
