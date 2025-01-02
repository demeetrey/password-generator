# Password Generator 1.1.0

<img src="src/assets/img/3.14lot-logo-md.png" alt="3.14LOT-logo" width="200px">

## Description

The **3.14LOT Password Generator** is a web-based tool designed to quickly and efficiently create strong, secure passwords. It offers various customization options for password length, complexity, and character types, ensuring user convenience and data safety.

---

## Features

- **Password Length Options**:
  - Predefined lengths: Choose from 8, 16, 24, 32, 40, 48, 56, and 64 characters.
  - Custom length: Adjust using a slider or input a specific value (between 8 and 64).
- **Character Types**:
  - **Lowercase letters**: Include `a-z` for case-sensitive security.
  - **Uppercase letters**: Include `A-Z` to add complexity.
  - **Numbers**: Include digits `0-9` for numerical strength.
  - **Special symbols**: Include characters like `!@#$%^&*()` to increase password uniqueness. All ASCII characters are included.
- **Smart Password Mode**:
  - Avoids ambiguous combinations like `r` and `n` (can appear as `m`) or `v` and `v` (can appear as `w`) or `c` and `l` (can appear as `d`).
  - Prevents repetitive symbols like `_` and `_` being mistaken as a single `_` or `'` and `'` or `` ` `` and `` ` `` being mistaken as `"`.
  - Ensures clear visual distinction in generated passwords.
- **Exclusion Rules**:
  - Optionally exclude visually similar characters such as:
    - `I`, `l`, `|` (uppercase i, lowercase L, and vertical bar).
    - `O`, `o`, `0` (uppercase O, lowercase o, and zero).
    - Single quotes `'` and backticks `` ` ``
- **Editable Password Field**:
  - Users can manually modify the generated password directly in the password field if they wish to replace or adjust any specific character.
  - Changes can be made using the keyboard, providing flexibility to meet personal preferences.
- **User-Friendly Interface**:
  - Simple toggles and sliders for easy configuration.
  - Real-time password preview with an option to hide or show the password.
- **Copy Password**:
  - Copy the generated password with a single click, ensuring ease of use.
- **Language Support**:
  - Fully translated into English and Russian for wider accessibility.
- **Completely Client-Side**:
  - All operations are handled locally in the browser.
  - No passwords or user data are sent to external servers, ensuring complete privacy.
- **FAQ Section**:
  - Provides clear answers to common user queries about password security and usage.

---

## How to Use

1. Open the **Secure Password Generator** in your browser.
2. Select your preferred password settings:
   - Length
   - Character types
   - Smart mode or exclusion rules
3. Click the **Generate Password** button.
4. View and copy the generated password to your clipboard.

---

## FAQ

### Is the Online Password Generator safe?

Yes, all operations are client-side, ensuring that no data or generated passwords leave your device.

### Why use a password generator?

A password generator creates strong, random passwords to protect your accounts and minimize unauthorized access risks.

### How do I create a secure password?

A secure password should:

- Be at least 8 characters long.
- Include uppercase, lowercase, numbers, and symbols.
- Avoid predictable patterns like `123456` or `qwerty`.

---

## Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript** (client-side)

---

## License

&copy; 2025 3.14LOT.COM. All rights reserved.

---

## Contact

For questions or support, contact us at [passgen@3.14lot.com](mailto:passgen@3.14lot.com)
