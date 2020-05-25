import React, { useState } from "react"
import styles from "./App.module.css"

const randomIntFromInterval = (
  min: number,
  max: number // min and max included
) => Math.floor(Math.random() * (max - min + 1) + min)

const randNum = () => randomIntFromInterval(0, 10)

function App() {
  const [num1, setNum1] = useState(randNum())
  const [num2, setNum2] = useState(randNum())

  const sorted = [num1, num2].sort((a, b) => b - a)

  const newGame = () => {
    setNum1(randNum())
    setNum2(randNum())
  }

  const isBeyond10 = num1 + num2 > 10

  return (
    <div className={styles.app}>
      <div className={styles.numbers}>
        {isBeyond10 ? (
          <>
            <Num num={sorted[0]} />
            <Sign sign="-" />
            <Num isSubtracted={true} num={sorted[1]} />
          </>
        ) : (
          <>
            <Num num={num1} />
            <Sign sign="+" />
            <Num num={num2} />
          </>
        )}
      </div>
      <Matrix
        solution={isBeyond10 ? sorted[0] - sorted[1] : sorted[0] + sorted[1]}
        onSolved={newGame}
      />
    </div>
  )
}

const Sign = ({ sign }: { sign: string }) => (
  <div className={styles.sign}>{sign}</div>
)

const Num = ({
  num,
  isSubtracted
}: {
  num: number
  isSubtracted?: boolean
}) => {
  const [showLines, setShowLines] = useState(false)
  return (
    <div className={styles.numContainer}>
      {showLines && (
        <div className={styles.lines}>
          {[...Array(num)].map(() => (
            <div
              className={`${styles.line} ${
                isSubtracted ? styles.lineSubtracted : ""
              }`}
            />
          ))}
        </div>
      )}
      <div onClick={() => setShowLines(true)} className={styles.hint}>
        ?
      </div>
      <div className={styles.num}>{num}</div>
    </div>
  )
}

const Matrix = ({
  solution,
  onSolved
}: {
  solution: number
  onSolved: () => void
}) => {
  const [selected, setSelected] = useState<null | number>(null)
  const onOk = () => {
    setSelected(null)
    selected === solution && onSolved()
  }
  return (
    <>
      <div className={styles.matrix}>
        {[...Array(11)].map((key, index) => (
          <div className={styles.matrixNum} onClick={() => setSelected(index)}>
            {index}
          </div>
        ))}
      </div>
      <Alert
        show={selected !== null}
        onOk={onOk}
        message={selected === solution ? "כל הכבוד!" : "נסו שוב"}
        background={selected === solution ? "#15ee15" : "#ff1c1c"}
      />
    </>
  )
}

const Alert = ({
  show,
  message,
  onOk,
  background
}: {
  show: boolean
  message: string
  onOk: () => void
  background: string
}) => {
  if (!show) return null
  return (
    <div onClick={onOk} className={styles.alert}>
      <div style={{ background }} className={styles.alertMessageContainer}>
        <div className={styles.alertMessage}>{message}</div>
      </div>
    </div>
  )
}

export default App
