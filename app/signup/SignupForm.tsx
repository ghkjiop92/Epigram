'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import styles from './SignupForm.module.scss';

const signupSchema = z
  .object({
    email: z.string().email('올바른 이메일 형식이어야 합니다'),
    password: z
      .string()
      .min(12, '비밀번호는 최소 12자 이상이어야 합니다')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|\\;:'",.<>/?]).{12,}$/,
        '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다',
      ),
    confirmPassword: z.string(),
    nickname: z.string().min(1, '닉네임은 필수입니다'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

type SignupForm = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState<SignupForm>({
    email: '이메일',
    password: '비밀번호',
    confirmPassword: '비밀번호 확인',
    nickname: '닉네임',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof SignupForm, string>>
  >({});

  const mutation = useMutation<unknown, Error, SignupForm>({
    mutationFn: async (data) => {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (res.status === 500 && errorData?.message?.includes('닉네임')) {
          throw new Error('이미 존재하는 닉네임입니다');
        }
        throw new Error(errorData.message || '회원가입 실패');
      }

      return res.json();
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      router.push('/');
    }
  }, [mutation.isSuccess, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Partial<Record<keyof SignupForm, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof SignupForm;
        newErrors[field] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    setErrors({});
    mutation.mutate(formData);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.wrapper}>
        <div className={styles.logoWrapper}>
          <div>
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
        </div>

        <form onSubmit={handleSubmit} noValidate className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
              data-state={formData.email !== '이메일' ? 'filled' : 'default'}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>
          <div className={styles.passwordGroup}>
            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>
                비밀번호
              </label>
              <div className={styles.passwordWrapper}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className={styles.input}
                  value={formData.password}
                  onChange={handleChange}
                  data-state={
                    formData.password !== '비밀번호' ? 'filled' : 'default'
                  }
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  👁️‍🗨️
                </button>
              </div>
              {errors.password && (
                <p className={styles.error}>{errors.password}</p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="confirmPassword" className={styles.label}></label>
              <div className={styles.passwordWrapper}>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  className={styles.input}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  data-state={
                    formData.confirmPassword !== '비밀번호 확인'
                      ? 'filled'
                      : 'default'
                  }
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  👁️‍🗨️
                </button>
              </div>
              {errors.confirmPassword && (
                <p className={styles.error}>{errors.confirmPassword}</p>
              )}
            </div>
            <div className={`${styles.field} ${styles.nicknameField}`}>
              <div className={styles.field}>
                <label htmlFor="nickname" className={styles.label}>
                  닉네임
                </label>
                <input
                  id="nickname"
                  name="nickname"
                  type="text"
                  className={styles.input}
                  value={formData.nickname}
                  onChange={handleChange}
                  data-state={
                    formData.nickname !== '닉네임' ? 'filled' : 'default'
                  }
                />
                {errors.nickname && (
                  <p className={styles.error}>{errors.nickname}</p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={mutation.isPending}
          >
            <span className={styles.buttonText}>
              {mutation.isPending ? '가입 중...' : '가입하기'}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
