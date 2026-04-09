var APP = (window as any).APP;

interface QuizQuestion {
  question: string;
  choices: string[];
  correct: number;
  explanation?: string;
}

function Quiz({ questions, onPass }: { questions: QuizQuestion[]; onPass?: () => void }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const allAnswered = Object.keys(answers).length === questions.length;

  const handleSelect = (qIndex: number, choiceIndex: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIndex]: choiceIndex }));
  };

  const handleSubmit = () => {
    if (!allAnswered) return;
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correct) correct++;
    });
    setScore(correct);
    setSubmitted(true);

    if (onPass && correct === questions.length) {
      onPass();
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const percentage = Math.round((score / questions.length) * 100);
  const passed = score === questions.length;

  return (
    <div className="quiz-container">
      {/* Score banner (shown after submit) */}
      {submitted && (
        <div className={`quiz-score ${passed ? 'quiz-score-pass' : 'quiz-score-fail'}`}>
          <div className="quiz-score-icon">{passed ? '🎉' : '📊'}</div>
          <div className="quiz-score-text">
            <strong>{score}/{questions.length}</strong> correct — {percentage}%
            {passed && <span className="quiz-score-label"> — Perfect!</span>}
            {!passed && <span className="quiz-score-label"> — Review the explanations below</span>}
          </div>
          {!passed && (
            <button className="btn btn-outline btn-sm" onClick={handleRetry}>
              🔄 Retry
            </button>
          )}
        </div>
      )}

      {/* Questions */}
      {questions.map((q, qIndex) => {
        const userAnswer = answers[qIndex];
        const isCorrect = submitted && userAnswer === q.correct;
        const isWrong = submitted && userAnswer !== undefined && userAnswer !== q.correct;

        return (
          <div
            key={qIndex}
            className={`quiz-question ${submitted ? (isCorrect ? 'quiz-correct' : 'quiz-wrong') : ''}`}
          >
            <div className="quiz-question-header">
              <span className="quiz-question-number">Q{qIndex + 1}</span>
              <span className="quiz-question-text">{q.question}</span>
              {submitted && (
                <span className={`quiz-question-badge ${isCorrect ? 'correct' : 'wrong'}`}>
                  {isCorrect ? '✓' : '✗'}
                </span>
              )}
            </div>

            <div className="quiz-choices">
              {q.choices.map((choice, cIndex) => {
                const isSelected = userAnswer === cIndex;
                const isTheCorrectOne = q.correct === cIndex;
                let choiceClass = 'quiz-choice';
                if (submitted) {
                  if (isTheCorrectOne) choiceClass += ' quiz-choice-correct';
                  else if (isSelected && !isTheCorrectOne) choiceClass += ' quiz-choice-wrong';
                  else choiceClass += ' quiz-choice-dim';
                } else if (isSelected) {
                  choiceClass += ' quiz-choice-selected';
                }

                return (
                  <label key={cIndex} className={choiceClass} onClick={() => handleSelect(qIndex, cIndex)}>
                    <span className="quiz-choice-indicator">
                      {submitted
                        ? (isTheCorrectOne ? '✓' : (isSelected ? '✗' : String.fromCharCode(65 + cIndex)))
                        : String.fromCharCode(65 + cIndex)
                      }
                    </span>
                    <span className="quiz-choice-text">{choice}</span>
                  </label>
                );
              })}
            </div>

            {submitted && q.explanation && (
              <div className="quiz-explanation">
                <span className="quiz-explanation-icon">💡</span>
                <span>{q.explanation}</span>
              </div>
            )}
          </div>
        );
      })}

      {/* Submit button */}
      {!submitted && (
        <div className="quiz-actions">
          <button
            className={`btn btn-primary ${!allAnswered ? 'btn-disabled' : ''}`}
            onClick={handleSubmit}
            disabled={!allAnswered}
          >
            ✅ Check Answers ({Object.keys(answers).length}/{questions.length})
          </button>
          {!allAnswered && (
            <span className="quiz-hint">Answer all questions to check</span>
          )}
        </div>
      )}
    </div>
  );
}

APP.Quiz = Quiz;
