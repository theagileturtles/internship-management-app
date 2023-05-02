import Head from 'next/head'
import Image from 'next/image'
import { Asap_Condensed, Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Typography } from '@mui/material'
import Layout from '@/components/layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <>
      <Layout>
      Here is the home page
      </Layout>
    </>
  )
}
