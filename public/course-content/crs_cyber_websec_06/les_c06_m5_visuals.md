## One root cause, two cures

![A diagram showing untrusted data reaching a SQL string (cured by parameterisation) or HTML output (cured by output encoding), under the shared rule to keep data as data.](/assets/courses/cyber-06/C06-M05-F1.svg)
*Figure C06-M05-F1. Injection and XSS share a root cause and have matching cures: parameterisation and output encoding.*

## SQL injection auth bypass in the lab

![A worked example of a SQL injection authentication bypass in the vulnerable login query and the parameterised version that stops it.](/assets/courses/cyber-06/C06-M05-F2.svg)
*Figure C06-M05-F2. Concatenated SQL lets admin'-- bypass the password; parameterisation prevents it [R2].*

## XSS contexts and the encoding fix

![A diagram of reflected, stored and DOM XSS contexts with the shared fix of contextual output encoding, CSP and HttpOnly cookies.](/assets/courses/cyber-06/C06-M05-F3.svg)
*Figure C06-M05-F3. The three XSS contexts and the output-encoding (plus CSP) defence [R4].*
