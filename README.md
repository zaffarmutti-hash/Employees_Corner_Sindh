# Employees Corner Sindh 🏛️

> **Your Digital Workplace for a Better Tomorrow**  
> An all-in-one digital portal for Government of Sindh employees, teachers, Drawing & Disbursing Officers (DDOs), and accounts officers.

![Employees Corner Sindh](public/logo.png)

---

## 🌟 Overview

**Employees Corner Sindh** is a comprehensive, production-ready web platform built with **Next.js 15** and **React 19** to digitize public service payroll processing, arrears billing, and civil service retirement calculations across the Province of Sindh, Pakistan.

---

## 🚀 Key Modules & Capabilities

### 1. 📄 Form T.R.22 Arrears Pay Bill Generator
- **Treasury Rule 265 (T.R. 265)** compliance for claims of retrospective pay, annual increments, and allowances.
- **Strict 4-Page Print Layout**:
  - **Page 1 (Obverse)**: Cost Center, DDO Code, Functional Code, Treasury Code, Basic Pay breakdown, and 14 regular allowance heads.
  - **Page 2 (Statement of Arrears)**: Month-by-month basic pay and active allowance heads.
  - **Page 3 (Statement of Deductions)**: Month-by-month G.P. Fund, Benevolent Fund, Group Insurance, Professional Tax, and Income Tax.
  - **Page 4 (Reverse)**: 5 statutory certificates, DDO sanction stamp, and payment modes (Transfer / Cash).
- **18mm Left Gutter**: Physical filing margin designed specifically for standard two-prong office files and hole punching without clipping text or borders.
- **Automated Pay Object Codes**: Auto-assigns `A01101` (Officers BPS-17+) vs `A01151` (Officials BPS-1 to 16).
- **Number to Words**: Generates Pakistani/Indian currency wording (*Rupees ... Lacs ... Thousand only*).

### 2. 🧮 Pension & Form 2 (FO-2) Dossier Calculator
- Compliant with **Sindh Civil Servants Pension Rules**.
- **Service Length & Qualifying Service**: Auto-calculates gross service length and qualifying service (capped at 30 years, 6+ months rounded up).
- **Gross Pension**: Computes standard formula `(Emoluments × Qualifying Service / 30) × 70%`.
- **Commutation (Lumpsum)**: Computes 35% commutation using the official Sindh age-factor commutation table (ages 20 to 65).
- **Net Monthly Pension**: Computes monthly net pension plus medical allowance.
- **Printable FO-2 Dossier**: Generates the official Sindh Form 2 pension calculation sheet for the District Accounts Office / AG Sindh.

### 3. 📂 Digital Records & Bills Archive
- RESTful storage API (`/api/bills` and `/api/bills/[id]`).
- Instant search by Employee Name or SAP PID.
- Load, edit, backup, and delete digitized bill records.

### 4. 🏛 Sindh DDO & Object Codes Directory
- Complete PIFRA / SAP accounting dictionary:
  - Pay codes: `A01101`, `A01151`, `013` (Personal Pay), `014` (Special Pay).
  - Allowances: `A01202` (HRA), `A01203` (Conveyance), `A01217` (Medical), `A0124X` (ARA 2023 35%), `A0125X` (ARA 2024 25%), Teaching Allowance, Differential Allowance.
  - Deductions: G.P. Fund, Benevolent Fund, Group Insurance, Professional Tax, Income Tax, House Building Advance.
- Directory of District Accounts Offices (Karachi, Hyderabad, Khairpur, Sukkur, Larkana, Nawabshah, etc.).

### 5. 🔍 SEO & Search Engine Optimization
- Semantic metadata with complete OpenGraph & Twitter Cards.
- **Schema.org Structured Data** (`GovernmentService`, `WebApplication`, `FAQPage` rich snippets).
- Automated `sitemap.xml` and `robots.txt`.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Modern CSS3 + CSS Paged Media (`@page { size: A4 portrait }`)
- **Persistence**: Server JSON storage (`data/bills.json`) & LocalStorage fallback
- **Runtime**: Node.js v20+

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/zaffarmutti-hash/Employees_Corner_Sindh.git
cd Employees_Corner_Sindh

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

### Building for Production
```bash
npm run build
npm run start
```

---

## 🖨️ Printing Guidelines for Form T.R.22

In the browser print dialog:
- **Destination**: Save as PDF (or physical printer)
- **Paper size**: A4
- **Margins**: None (or Default)
- **Scale**: 100%
- **Options**: Tick **Background graphics**
- **Duplex**: Print double-sided, flip on long edge

---

## 👤 Author & Credits

- **Creator & Designer**: Asif Ali Shar
- **Repository**: [zaffarmutti-hash/Employees_Corner_Sindh](https://github.com/zaffarmutti-hash/Employees_Corner_Sindh.git)

---

## 📜 License & Disclaimer

Designed for official use by Government of Sindh employees, school administrations, and public offices. Compliant with Sindh Financial Rules and Treasury Rules.

