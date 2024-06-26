# Hunter.io API Integration

This exercise integrates the Hunter.io API with Google Sheets to find email addresses based on first name, last name, and company.

## Features

- Authorize with Hunter.io API
- Input first names, last names, and company names/websites in Google Sheets
- Automatically find and display email addresses in the spreadsheet
- Error handling for API responses

## Setup

1. **Open the Google Sheets:**
    - Go to `Extensions` > `Apps Script`.

2. **Add Code:**
    - Copy and paste the code from `Code.gs` and `ApiKeyPrompt.html`.

3. **Set Script Properties:**
    - Go to `File` > `Project properties` > `Script properties`.
    - Add properties for `CLIENT_ID` and `CLIENT_SECRET` with your respective values.

4. **Authorize the Script:**
    - Run `Authorize Hunter.io` from the custom menu.

5. **Enter Hunter.io API Key:**
    - Use the `Enter API Key` menu option to input your API key.

6. **Input Data:**
    - Enter first names, last names, and company names/websites into columns A, B, and C respectively.

7. **Find Emails:**
    - Run the `Find Emails` function to populate column D with the found emails.
    - Alternatively, use the formula `=FindEmail(A2,B2,C2)` to get email addresses directly.

## Usage

1. **Input Data:**
    - Fill columns A, B, and C with first names, last names, and company names.

2. **Custom Menu Options:**
    - Authorize the app and enter your Hunter.io API key via the custom menu.

3. **Retrieve Emails:**
    - Run the `Find Emails` function or use the custom formula for each row.

## Example

Here's an example using the Hunter.io discover tool:

| First Name | Last Name | Company        | Email                           |
|------------|-----------|----------------|---------------------------------|
| Alison     | Connard   | dailymotion.com| alison.connard@dailymotion.com  |
| Nikhil     | Jain      | dailymotion.com| nikhil.jain@dailymotion.com     |

### Deliverables

- **Google Sheet:**
- https://docs.google.com/spreadsheets/d/1_t1r3_vQMass7nBQq1yQFatVQgjJVETtgyFGCB6fVHM/edit?usp=sharing

- **GitHub Repository:**
- https://github.com/hovominhkhue/Hunter.io-API-Integration.git

### Notes

- Ensure that the `CLIENT_ID` and `CLIENT_SECRET` are stored securely in the script properties and not hard-coded in your source files.
- Update the script properties in the Google Apps Script editor by navigating to `File` > `Project properties` > `Script properties`.

By following these instructions, you'll be able to securely integrate and use the Hunter.io API within your Google Sheets without exposing sensitive credentials in your source code.