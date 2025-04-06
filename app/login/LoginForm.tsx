'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import styles from './LoginForm.module.scss';
import Signup from '../signup/SignupForm';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일은 필수 입력입니다.')
    .email('이메일 형식으로 작성해 주세요.'),
  pass: z
    .string()
    .min(1, '비밀번호는 필수 입력입니다.')
    .min(12, '비밀번호는 최소 12자 이상이어야 합니다')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|\\;:'",.<>/?]).{12,}$/,
      '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다',
    ),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginForm>({
    email: '이메일',
    pass: '비밀번호',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginForm, string>>
  >({});
  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation<unknown, Error, LoginForm>({
    mutationFn: async (data) => {
      const payload = new FormData();
      payload.append('email', data.email);
      payload.append('pass', data.pass);

      const res = await fetch('/api/login', {
        method: 'POST',
        body: payload,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error?.[0]?.message || '로그인 실패');
      }

      return res.json();
    },
    onSuccess: () => {
      router.push('/');
    },
    onError: (err) => {
      if (err.message.includes('이메일')) {
        setErrors((prev) => ({ ...prev, email: err.message }));
      } else if (err.message.includes('비밀번호')) {
        setErrors((prev) => ({ ...prev, pass: err.message }));
      } else {
        alert(err.message);
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (
      (name === 'email' && value === '이메일') ||
      (name === 'pass' && value === '비밀번호')
    ) {
      setFormData((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let error = '';

    if (name === 'email') {
      if (!value.trim()) {
        error = '이메일은 필수 입력입니다.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = '이메일 형식으로 작성해 주세요.';
      }
    }

    if (name === 'pass') {
      if (!value.trim()) {
        error = '비밀번호는 필수 입력입니다.';
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: Partial<Record<keyof LoginForm, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof LoginForm;
        newErrors[field] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    mutation.mutate(formData);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.wrapper}>
        <div className={styles.logoWrapper}>
          <Link href="/">
            <Image
              src="/images/Book.png"
              alt="Book logo"
              width={36}
              height={36}
              className={styles.logoIcon}
              priority
            />
          </Link>
          <Link href="/">
            <Image
              src="/images/Epigram.png"
              alt="Epigram logo"
              width={91}
              height={26}
              className={styles.logoText}
              priority
            />
          </Link>
        </div>

        <form onSubmit={handleSubmit} noValidate className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}></label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={styles.input}
              data-state={formData.email === '이메일' ? 'default' : 'filled'}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div className={styles.field}>
            <label htmlFor="pass" className={styles.label}></label>
            <div className={styles.passwordWrapper}>
              <input
                id="pass"
                name="pass"
                type={showPassword ? 'text' : 'password'}
                value={formData.pass}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={styles.input}
                data-state={formData.pass === '비밀번호' ? 'default' : 'filled'}
              />

              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                👁️‍🗨️
              </button>
            </div>
            {errors.pass && <p className={styles.error}>{errors.pass}</p>}
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={mutation.isPending}
          >
            <span className={styles.buttonText}>
              {mutation.isPending ? '로그인 중...' : '로그인'}
            </span>
          </button>
          <div className={styles.signUpLink}>
            <span>회원이 아니신가요? </span>
            <Link href="/signup" className={styles.link}>
              가입하기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
