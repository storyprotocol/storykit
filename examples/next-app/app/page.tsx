import styles from "./page.module.css"
import { Button } from "storykit"
import 'storykit/dist/build.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Button variant="primary">Click me</Button>
      <Button variant="secondary">Click me</Button>
    </main>
  )
}
