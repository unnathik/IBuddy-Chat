## IBuddy: Connecting the International Baccalaureate Community

### Inspiration

Due to the COVID19 pandemic and thus schools shifting to an online medium (virtual education), it has become increasingly difficult for students to connect and talk to each other. With a curriculum as challenging as the IBDP, it is likewise incredibly important for students to be able to connect and share their experiences and resources with each other. Thus, we came up with IBuddy, to bridge that lack of connection between IBDP students.

### What it does

IBuddy consists of an IBuddy chat, with separate forums for each subject, where students can share messages and talk to each other. Along with chat, there are resources (such as embedded quizlets and YouTube videos) for each IBDP group of subjects. There is also a blog page with special hacks and tips, along with a CAS activity generator and a praise bot for when you need inspiration or are feeling down respectively (to boost your mental health).

### How I built it

For the IBuddy chat, we used ReactJS along with Redux, Firebase Authentication, and Firebase Cloud Firestore. For the IBuddy frontend, we used HTML, CSS, and Javascript. We also used an online software to create our logo. For resources, we used the Quizlet and YouTube APIs to embed the links into our pages.

### Challenges I ran into

This was our team's first time working with Redux, so that was slightly difficult. Also, it was difficult to integrate the IBuddy chat (given that it was developed as a separate product) into the frontend (homepage + resources + blog), due to difference in their programming languages. However, we were able to overcome this using a hosting service like Heroku and then linking the IBuddy chat.

## What's next for IBuddy

We'd like to get more users to create healthy conversation on the chat and keep adding additional (even proprietary) resources to IBuddy resources. We'd also like to integrate a toxic language filter and detector to ensure that the conversation is always positive.
