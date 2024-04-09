export const token_key = 'access-token';
export const user_key = 'user';
export const captcha_token_key = 'captcha-token';

// TODO 感觉可以重构，现在不够简介

export function getKey(key: string): string {
  return `ticket:${key}`;
}

export function get(key: string): string | null {
  return localStorage.getItem(getKey(key));
}

export function set(key: string, val: any): void {
  localStorage.setItem(getKey(key), val);
}

export function remove(key: string): void {
  localStorage.removeItem(getKey(key));
}

export const Token = {
  get: () => {
    return get(token_key);
  },
  set: (val: any) => {
    set(token_key, val);
  },
  clean: () => {
    remove(token_key);
  }
};

export const User = {
  get: () => {
    return get(user_key);
  },
  set: (val: any) => {
    set(user_key, val);
  },
  clean: () => {
    remove(user_key);
  }
};

export const CaptchaToken = {
  get: () => {
    return get(captcha_token_key);
  },
  set: (val: any) => {
    set(captcha_token_key, val);
  },
  clean: () => {
    remove(captcha_token_key);
  }
};
