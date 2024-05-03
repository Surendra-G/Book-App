// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import { getFirestore, collection, query, orderBy, onSnapshot, addDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC4KzKruJCAUXBAFaNX10loPlAMqncKzDw",
    authDomain: "book-author-2a472.firebaseapp.com",
    projectId: "book-author-2a472",
    storageBucket: "book-author-2a472.appspot.com",
    messagingSenderId: "179009885075",
    appId: "1:179009885075:web:9533aee68cd32c2ee44e66",
    measurementId: "G-BJVYK7VJZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Query Firestore to get books
const q = query(collection(db, "Book Name"), orderBy("Title"));
const unsubscribe = onSnapshot(q, (snapshot) => {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = ''; // Clear previous data

    snapshot.forEach((doc) => {
        const book = doc.data();
        const listItem = document.createElement('li');
        listItem.textContent = `${book.Title} - ${book.Author}`;
        bookList.appendChild(listItem);
    });
});

// Add data to Firestore
document.getElementById('btn').addEventListener('click', function() {
    const title = document.getElementById('titleInput').value;
    const author = document.getElementById('authorInput').value;
    addDoc(collection(db, "Book Name"), { Title: title, Author: author });
});
