import styles from "./page.module.css"
import { Button } from "storykit"
import 'storykit/dist/build.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Button variant="primary">hi</Button>
      <Button variant="secondary">hi</Button>
    </main>
  )
}
