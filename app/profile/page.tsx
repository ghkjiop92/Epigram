'use client';

import React, { useState } from "react";
import ProfileModal from "./ProfileModal";
import { FaUserCircle } from "react-icons/fa";

export default function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    console.log("프로필 삭제 완료!");
    setIsModalOpen(false);
  };

  return (
    <>
      <div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <FaUserCircle size={28} color="#ededed" />
        </button>

        <ProfileModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onDelete={handleDelete} 
        >
          <div>
            <h2>프로필 정보</h2>
            <p>이곳에 사용자 정보가 들어갑니다.</p>
          </div>
        </ProfileModal>
      </div>
    </>
  );
}
