
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const VietnameseWords = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const words = [
    "tôi", "bạn", "anh ấy", "cô ấy", "chúng tôi", "các bạn", "họ", "này", "đó", "gì",
    "ai", "đâu", "khi nào", "tại sao", "làm thế nào", "có", "không", "làm ơn", "cảm ơn", "xin lỗi",
    "tên", "nhà", "nước", "thức ăn", "thời gian", "ngày", "đêm", "sáng", "tối", "năm",
    "tháng", "tuần", "hôm nay", "ngày mai", "hôm qua", "mẹ", "bố", "anh trai", "chị gái", "trẻ em",
    "đàn ông", "phụ nữ", "bạn", "giáo viên", "bác sĩ", "sách", "bút", "giấy", "bàn", "ghế",
    "phòng", "cửa", "cửa sổ", "trần nhà", "sàn nhà", "đường", "xe hơi", "tàu hỏa", "máy bay", "cây",
    "hoa", "lá", "trái cây", "rau", "cơm", "bánh mì", "sữa", "trà", "cà phê", "đường",
    "muối", "dầu", "thịt", "cá", "trứng", "đỏ", "trắng", "đen", "xanh dương", "xanh lá",
    "vàng", "hồng", "nâu", "nhỏ", "lớn", "mới", "cũ", "nóng", "lạnh", "tốt",
    "xấu", "vui", "buồn", "nhanh", "chậm", "trên", "dưới", "trong", "ngoài", "đây"
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Vietnamese word: ${words[index]}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-vietnamese" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Vietnamese
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Từ tiếng Việt (Vietnamese Words)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn Vietnamese words
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-8xl mx-auto">
          {words.map((word, index) => (
            <div key={index} className="word-card">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-semibold">{word}</div>
                <Button
                  onClick={() => playAudio(index)}
                  className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''}`}
                  size="sm"
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="language-card max-w-md mx-auto">
            <h3 className="text-2xl font-bold mb-4">Vocabulary Builder</h3>
            <p className="text-muted-foreground mb-4">
              Click on any word card to hear the pronunciation
            </p>
            <p className="text-sm text-primary">
              Audio pronunciation coming soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VietnameseWords;
