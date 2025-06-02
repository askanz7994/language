import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";
const RussianWords = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const words = ["я", "ты", "он", "она", "мы", "вы", "они", "это", "то", "что", "кто", "где", "когда", "почему", "как", "да", "нет", "пожалуйста", "спасибо", "извините", "имя", "дом", "вода", "еда", "время", "день", "ночь", "утро", "вечер", "год", "месяц", "неделя", "сегодня", "завтра", "вчера", "мама", "папа", "брат", "сестра", "ребенок", "мужчина", "женщина", "друг", "учитель", "врач", "книга", "ручка", "бумага", "стол", "стул", "комната", "дверь", "окно", "потолок", "пол", "дорога", "машина", "поезд", "самолет", "дерево", "цветок", "лист", "фрукт", "овощ", "рис", "хлеб", "молоко", "чай", "кофе", "сахар", "соль", "масло", "мясо", "рыба", "яйцо", "красный", "белый", "черный", "синий", "зеленый", "желтый", "розовый", "коричневый", "маленький", "большой", "новый", "старый", "горячий", "холодный", "хороший", "плохой", "счастливый", "грустный", "быстрый", "медленный", "выше", "ниже", "внутри", "снаружи", "здесь"];
  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Russian word: ${words[index]}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };
  return <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-russian" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Russian
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Русские слова (Russian Words)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn Russian words
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-8xl mx-auto">
          {words.map((word, index) => <div key={index} className="word-card">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-semibold">{word}</div>
                <Button onClick={() => playAudio(index)} className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''}`} size="sm">
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </div>)}
        </div>

        <div className="text-center mt-16">
          
        </div>
      </div>
    </div>;
};
export default RussianWords;