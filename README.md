# vc-trade
# Frontend dev code challenge
As requested by our users, we need to implement a User search Page.
This page will allow the users to lookup other users in the company, list
all the matching results and, when one selected, display that user
profile and detailed information.
In order to get the user information, you need to use the
randomuser.me API. This Api will generate random user data on each
request. Everything needed is in the documentation but don’t hesitate
to ask if you have any question about it.

# Business Requirements:
1. By the time the page loads we want to populate the results list
with 25 user entries. The last item must be an option with the
legend “More results...” that will request another 25 entries and
append them to the list.
2. On top of the search list, we need a free text input that will filter
the current results by the user First name or Last name field. We
also want to be able to filter by their gender. The Api only handles
“male” and “female” as possible genders.
3. On the results list each user entry should display their name,
email information and a thumbnail picture of them. The name and
last name must have their first letter capitalized.
4. When clicking one of the user entries the detailed information
should be displayed on the screen. We want to see the user id,
location and contact information along with their picture.
5. Implement an infinite scrolling on the search list.
6. Persist the current page state (search results, selected user, filters) on refresh.

# Technical Requirements:
- The app must be made with Vue preferable using typescript.
- The code must be pushed to a GitHub or GitLab repo.
- The UI design has no hard definitions, we are including a low-fi mock of how we thought the implementation could be but it’s not mandatory to follow it, you can come with your own visual design.
- Only request the information we need to the Api.

# Bonus points:
- Deploy the app in any online hosting you want, I personally use Vercel.
- Include unit testing, preferable with Jest.
- Have a responsive design