# 🛒 Smart Shopping Cart – React + TypeScript Challenge

Welcome 👋  

This project is a partially implemented Smart Shopping Cart built with:

- React
- TypeScript
- Vite

Your task is to complete and improve the system according to the requirements below.

## 📦 Project Overview

This application allows users to:

- View products
- Add products to cart
- Update quantities
- Remove items
- Apply coupon codes
- View subtotal, tax, and total

However, the current implementation is incomplete and contains architectural and logical issues.

You must fix, improve, and extend it.

# 🚨 Your Tasks

You must complete the following features:

## 1️⃣ Fix State Mutation Bug

There is a mutation issue inside `CartContext`.

Requirements:

- No direct mutation of state
- Follow immutable update patterns
- Ensure React re-renders correctly

## 2️⃣ Implement Cart Persistence

The cart should:

- Load from `localStorage` on app start
- Save to `localStorage` whenever it changes
- Handle invalid or corrupted stored data safely
- Avoid infinite `useEffect` loops

## 3️⃣ Implement Discount Rule Engine

A file called `discountRules.ts` exists but is not integrated.

You must:

- Dynamically evaluate discount rules
- Apply all matching rules
- Combine rule discount with coupon discount
- Ensure recalculation when cart changes

Important:
- Do NOT store calculated totals in state.
- Totals must always be derived.

## 4️⃣ Improve Total Calculation

The current total calculation has issues:

- Floating point precision errors
- No proper rounding strategy

Requirements:

- Use a safe rounding strategy
- Ensure values display correctly (2 decimal places)
- Avoid floating precision issues

## 5️⃣ Fix Async Coupon Race Condition

The coupon validation is async.

If a user clicks "Apply" multiple times quickly:

- Old responses should not override new ones
- Component should not update state after unmount
- Loading state must behave correctly

You must handle:

- Race conditions
- Proper cleanup logic
- Disabled button while validating

## 6️⃣ Improve Type Safety

Requirements:

- No `any`
- No unsafe casting
- Proper strict typing
- Strongly typed context
- Avoid nullable misuse
- Improve type structure if necessary

## 7️⃣ Avoid Unnecessary Re-renders

The app should not:

- Re-render entire cart on every input change unnecessarily
- Recreate functions unnecessarily

You may use:

- `useMemo`
- `useCallback`
- `React.memo`

But do NOT over-optimize.

## 8️⃣ Maintain Clean Architecture

You should:

- Separate business logic from UI
- Avoid putting too much logic in components
- Keep context clean and focused
- Avoid derived state inside context

---

# 🧠 Constraints

- Do NOT install additional state management libraries.
- Do NOT use Redux, Zustand, MobX, etc.
- Do NOT convert everything to a single giant reducer unless justified.
- Keep it simple and clean.
- Do NOT remove TypeScript strictness.

---

# 🧪 Edge Cases to Consider

- Empty cart
- Negative quantities
- Very large quantities
- Invalid coupon
- Multiple rule discounts
- Refresh page after adding items
- Corrupted localStorage data

# 🏆 Bonus (Optional)

If you want to go further:

- Add unit tests (Vitest)
- Add optimistic UI for coupon
- Add loading indicators per item
- Convert cart logic into a custom hook
- Add undo/redo support

# 📊 Evaluation Criteria

You will be evaluated on:

### Code Quality
- Clean structure
- Naming conventions
- Readability

### React Knowledge
- Proper hook usage
- Dependency arrays correctness
- Derived state handling
- Rendering optimization

### JavaScript Understanding
- Immutability
- Array methods
- Async handling
- Race condition handling

### TypeScript Knowledge
- Strong typing
- Type narrowing
- Interface design
- Safe context usage

### Architecture Thinking
- Separation of concerns
- Avoiding unnecessary complexity
- Scalability mindset

# 🚀 Goal

This assignment is designed to test:

- Your understanding of React fundamentals
- Your understanding of TypeScript
- Your knowledge of JavaScript core concepts
- Your ability to reason about architecture
- Your ability to handle real-world edge cases

Take your time. Think deeply. Write clean code.

Good luck 🚀