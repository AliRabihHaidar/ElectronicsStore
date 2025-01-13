# RF Telecom Website


## Principles
### MVC Design Pattern:
MVC is a software architecture pattern that separates an application into three interconnected components:
- Models:
    - business logic
    - data
- Views:
    - user interface
    - dynamic based on given data
- Controllers:
    - intermediary level
    - handles requests from users (sent through views)
    - interacts with models
    - re-renders views accordingly

### RESTful API:
RESTful API is a design style for networked applications. It is based on the idea of resources.

Resources are identified by URIs and can be manipulated using standard HTTP methods:
- **GET**: Retrieve data (e.g., fetching products).
- **POST**: Create new resources (e.g., adding a product to the cart).
- **PUT**: Update existing resources (e.g., updating user information).
- **DELETE**: Remove resources (e.g., deleting a product from the cart).


### Routes:
Routes are the paths that users can navigate through in the application. They are defined in the controller and map URLs in the website to specific actions within the controller.

Controller's actions are the methods that handle requests, process data through models, and return responses through views.
Controller's actions also use standard HTTP methods to respond to requests.






## Project Structure:

- db/: represents the *Model* layer:
    - [db_setup.js](./db/db_setup.js): initiates the database (uses [schema.sql](./db/schema.sql) & [triggers.sql](./db/triggers.sql))
    - [db_utils.js](./db/db_utils.js): provides all functions needed to interact with database (CRUDS)

- routes/: represents *Controller* layer:
    - Includes 6 controllers-files, each of them is responsible for handling a part of the user requests. It processes incoming requests, interacts with the model, and determines which view to render.

- pages/: represents *Views* layer:
    - Includes html pages, but written as EJS to be dynamic (change upon given data). So each file is a page in our website.

- [app.js](./app.js): This is the main application file:
    - initializes the Express server
    - sets up middleware
    - sets up routes.
    - It acts as the entry point of the application, coordinating the overall flow between the model, view, and controller.

- static/: holds static files such as css, js, images (to enhance the user interface; part of the View layer)
