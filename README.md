# Dessert Shop

A11y-first, signal-based cart demo.

## Stack

- Angular 21 standalone, OnPush, Signals
- Tailwind v4.1 (configless + @theme)
- NgOptimizedImage for responsive images and images optimization

## Features

- Product grid with add/increment/decrement
- Cart with remove, totals, confirm
- Order confirmation modal route
- Currency formatting (GHS by default)
- WCAG AA accessible, AXE clean

## Run

npm i
npm start / ng serve

## Build

npm run build

## Project Structure

components/
pages/
types/
assets/

## Accessibility

- Dialog semantics with Escape to close
- Visible focus styles
- ARIA live region for add-to-cart
- High color contrast

## Data

`assets/data/data.json`

## Branching

See Git history for feature branches.
