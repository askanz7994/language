
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const ChineseWords = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const words = [
    "我", "你", "他", "她", "我们", "你们", "他们", "这", "那", "什么",
    "谁", "哪里", "什么时候", "为什么", "怎么", "是", "不", "请", "谢谢", "对不起",
    "名字", "家", "水", "食物", "时间", "天", "夜", "早上", "晚上", "年",
    "月", "周", "今天", "明天", "昨天", "妈妈", "爸爸", "哥哥", "姐姐", "孩子",
    "男人", "女人", "朋友", "老师", "医生", "书", "笔", "纸", "桌子", "椅子",
    "房间", "门", "窗户", "天花板", "地板", "路", "车", "火车", "飞机", "树",
    "花", "叶子", "水果", "蔬菜", "米饭", "面包", "牛奶", "茶", "咖啡", "糖",
    "盐", "油", "肉", "鱼", "蛋", "红", "白", "黑", "蓝", "绿",
    "黄", "粉", "棕", "小", "大", "新", "老", "热", "冷", "好",
    "坏", "快乐", "悲伤", "快", "慢", "上面", "下面", "里面", "外面", "这里"
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Chinese word: ${words[index]}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-chinese" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Chinese
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            中文词汇 (Chinese Words)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn Chinese words
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
      </div>
    </div>
  );
};

export default ChineseWords;
