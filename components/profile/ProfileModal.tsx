// components/ProfileImageUploadModal.tsx
import { useRef, useState, ChangeEvent } from "react";

export default function ProfileImageUploadModal() {
  // 기본 프로필 이미지 경로 (원하는 기본 이미지 경로로 교체)
  const [profile, setProfile] = useState<string>("/default-profile.png");
  // 파일 선택 input 태그에 접근하기 위한 useRef
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 파일 선택 시 호출되는 핸들러
  const imgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // 선택한 파일을 URL로 만들어 미리보기 업데이트
      setProfile(URL.createObjectURL(file));

      // 여기서 FormData에 파일을 담아 백엔드로 전송하는 작업을 추가할 수 있습니다.
      // const formData = new FormData();
      // formData.append("file", file);
      // await axios.post("/api/upload", formData);
    }
  };

  // "사진 업로드" 버튼 클릭 시 input 태그를 강제로 클릭 처리
  const handleUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* 미리보기 영역 */}
      <div className="w-60 h-60 rounded-full overflow-hidden border border-gray-300">
        <img
          src={profile}
          alt="Profile Preview"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 파일 업로드 input: 화면에는 보이지 않도록 숨김 */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={imgHandler}
        className="hidden"
      />

      {/* 업로드 버튼 */}
      <button
        onClick={handleUploadClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        사진 업로드
      </button>
    </div>
  );
}
