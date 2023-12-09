import React, { useEffect, useState } from "react";
import "./App.css";
import "./fonts.css";

function App() {
  const [count, setCount] = useState(0);
  const [object, setObject] = useState({a: '9'});

  async function fetchQuizData() {
    try {
      // const response = await fetch('http://38.242.141.80:3001/quiz'); // Replace with your server's IP and the correct port
      const response = await fetch(
        "https://vivacious-mesquite-bear.glitch.me/quiz"
      ); // Replace with your server's IP and the correct port

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Fetching quiz data failed:", error);
    }
  }

  useEffect(() => {
    fetchQuizData().then((data) => {
      console.log(data); // Do something with the quiz data
      setObject(data)
    });
  }, []);

  return (
    <>
      <h1>Ημερήσιων και Εσπερινών Γενικών Λυκείων</h1>
      <p>Τέλος 1ης από 4 σελίδες</p>
      <p>{object.a}</p>

      <h2>Πανελλαδικές Εξετάσεις</h2>
      <p>Ημερήσιων & Εσπερινών Γενικών Λυκείων</p>
      <p>Πέμπτη 8 Ιουνίου 2023</p>
      <p>Εξεταζόμενο Μάθημα: Πληροφορική Προσανατολισμού</p>
      <p>Σύνολο Σελίδων: Τέσσερις (4)</p>

      <h3>Θέμα Α</h3>
      <p>
        Α1. Να γράψετε στο τετράδιό σας τον αριθμό καθεμιάς από τις παρακάτω
        προτάσεις 1 έως 5 και δίπλα τη λέξη ΣΩΣΤΟ, αν η πρόταση είναι σωστή ή τη
        λέξη ΛΑΘΟΣ, αν η πρόταση είναι λανθασμένη.
      </p>
      <ol>
        <li>
          1. Οποιαδήποτε εντολή επανάληψης ΟΣΟ…ΕΠΑΝΑΛΑΒΕ μπορεί να μετατραπεί σε
          εντολή επανάληψης ΓΙΑ…ΑΠΟ…ΜΕΧΡΙ…ΜΕ_ΒΗΜΑ.
        </li>
        <li>
          2. Η μέθοδος επεξεργασίας «πρώτο μέσα πρώτο έξω» (FIFO) εφαρμόζεται
          στη δομή δεδομένων ΟΥΡΑ.
        </li>
        <li>3. Κάθε συνάρτηση επιστρέφει μόνο μια τιμή.</li>
        <li>
          4. Η έκφραση A MOD 5 είναι συντακτικά σωστή στη ΓΛΩΣΣΑ, όταν το Α
          είναι πραγματική μεταβλητή.
        </li>
        <li>
          5. Σε μια λίστα τα στοιχεία δεν μπορούν να προστεθούν στην αρχή ή στο
          τέλος της, παρά μόνο στη μέση της.
        </li>
      </ol>

      <h3>Θέμα Β</h3>
      <p>Β1. Δίνεται το παρακάτω τμήμα αλγορίθμου:</p>
      <pre>ΓΙΑ i ΑΠΟ Α ΜΕΧΡΙ Μ ΜΕ_ΒΗΜΑ Β ΓΡΑΨΕ i ΤΕΛΟΣ_ΕΠΑΝΑΛΗΨΗΣ</pre>
      <p>
        Για καθέναν από τους ελέγχους να γράψετε στο τετράδιό σας τον αριθμό της
        περίπτωσης και δίπλα πόσες φορές θα εκτελεστεί η εντολή ΓΡΑΨΕ.
      </p>
      <ol>
        <li>1. Α= 2 Μ= 0 Β= -1</li>
        <li>2. Α= 5 Μ= 0 Β= 2</li>
        <li>3. Α= -3 Μ= 3 Β= 2</li>
      </ol>

      <h3>Θέμα Γ</h3>
      <p>Γ1. Να κατασκευάσετε πρόγραμμα σε ΓΛΩΣΣΑ, το οποίο:</p>
      <ol>
        <li>Γ1. Να περιλαμβάνει κατάλληλο τμήμα δηλώσεων.</li>
        <li>
          Γ2. Για κάθε κλήση να ζητάει τη διάρκεια ομιλίας σε δευτερόλεπτα
          ελέγχοντας ότι δίνεται θετικός αριθμός και να εμφανίζει τη χρέωσή της.
        </li>
        <li>
          Γ3. Η παραπάνω διαδικασία να τερματίζεται σε οποιαδήποτε από τις εξής
          περιπτώσεις:
          <ul>
            <li>όταν το σύνολο των χρεώσεων ξεπεράσει τα 10 ευρώ.</li>
            <li>όταν συμπληρωθούν 100 κλήσεις.</li>
          </ul>
        </li>
      </ol>
    </>
  );
}

export default App;
