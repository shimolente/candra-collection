import * as React from 'react'
import { cn } from '@/lib/utils'

function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('group border border-[var(--color-line)] bg-white', className)}
      {...props}
    />
  )
}

function CardMedia({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('relative aspect-[4/5] overflow-hidden bg-white', className)}
      {...props}
    />
  )
}

function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6', className)} {...props} />
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-xl', className)} {...props} />
}

export { Card, CardMedia, CardBody, CardTitle }
