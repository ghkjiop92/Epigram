// components/profile/ProfileModal.tsx
import React from "react";

type ModalProps = {
  children: React.ReactNode;  // children 속성을 추가합니다.
  onClick: () => void;
};

export default function ProfileModal({ children, onClick }: ModalProps) {
  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClick}
      aria-label="모달 뒷 배경"
    >
      <section
        role="dialog"
        aria-modal="true"
        className="relative rounded-xl bg-[#1b1b22] p-5 md:p-10 xl:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClick}
          className="absolute top-2 right-2 text-white text-2xl font-bold"
          aria-label="모달 닫기"
        >
          ×
        </button>
        {children}
      </section>
    </div>
  );
}
