questions = [
{
"question": "Which animal is the tallest in the world?",
"options": ["a) Elephant", "b) Giraffe", "c) Lion"],
"answer": "b"
},
{
"question": "What is the hottest planet in our solar system?",
"options": ["a) Venus", "b) Mars", "c) Earth"],
"answer": "a"
},
{
"question": "What is a baby cat called?",
"options": ["a) Kitten", "b) Puppy", "c) Calf", "d) Cub"],
"answer": "a"
},
{
"question": "Which animal is known as the 'King of the Jungle'?",
"options": ["a) Lion", "b) Tiger", "c) Elephant", "d) Monkey"],
"answer": "a"
},
{
"question": "What color do you get when you mix blue and yellow?",
"options": ["a) Green", "b) Orange", "c) Purple", "d) Pink"],
"answer": "a"
},
{
"question": "How many sides does a triangle have?",
"options": ["a) Two", "b) Three", "c) Four", "d) Five"],
"answer": "b"
},
{
"question": "How many fingers are on one hand?",
"options": ["a) Three", "b) Four", "c) Five", "d) Six"],
"answer": "c"
},
{
"question": "What season comes after summer?",
"options": ["a) Winter", "b) Spring", "c) Fall", "d) Autumn"],
"answer": "c" # or "d" if you prefer "Autumn" — both are correct!
}
]


def run_quiz(questions):
    score = 0
for q in questions:
    print("\n" + q["question"])
    for option in q["options"]:
        print(option)
answer = input("Your answer (a/b/c/d): ").lower()
if answer == q["answer"]:
    print("✅ Correct!")
    score += 1
else:
    print(f"❌ Wrong! The correct answer was {q['answer']}")
print(f"\n🎉 You scored {score} out of {len(questions)}")



if __name__ == "__main__":
    print("🎮 Welcome to the Quiz Game!")
run_quiz(questions)




