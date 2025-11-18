# 🏰 Welcome to the Emporium of Arcane Observability! 🧙‍♂️

Hark, adventurer! You've stumbled upon a most peculiar marketplace. This is no ordinary webshop, but a grand emporium where merchants from different realms (and technology stacks) ply their mystical wares. Our storefront is a bustling hub of activity, but its true purpose is a grander enchantment: to master the arcane arts of **OpenTelemetry** and weave a tapestry of distributed traces across our magical services.

## ✨ The Grand Design

Our emporium is a living laboratory, a place to experiment with observing a distributed system. While the magic of OpenTelemetry is not yet fully woven into the fabric of this project, our goal is to build a complete observability stack using the legendary **LGTM (Loki, Grafana, Tempo, Mimir)** artifacts. We shall soon track every potion, charm, and weapon as it travels from our merchants to our customers, revealing the hidden pathways of our system.

## 📜 The Scrolls of Power (The Tech Stack)

Our marketplace is powered by a diverse council of technologies, all orchestrated by the master scroll, `compose.yaml`.

*   **The Storefront (Next.js & TypeScript):** The main gateway to our emporium, where customers can browse our wondrous goods.
*   **The Database (PostgreSQL):** The ancient vault where all knowledge and inventory records are kept.

### Our Esteemed Merchants

Three master artisans offer their goods, each with their own unique technological magic:

*   **Bartholomew’s Go-Tonic Lab (Go):** A master alchemist whose concoctions are brewed with the swiftness of a mountain stream. His potions are served via a nimble Go API.
*   **Elara’s Bundle of Charms (PHP/Symfony):** A venerable enchantress whose charms are woven from intricate patterns and ancient lore, delivered through the robust magic of Symfony.
*   **Grimjaw’s Dino-Forge Arsenal (Deno):** A formidable smith whose armaments are forged with untamed power and pristine clarity, served by a modern and secure Deno API.

## 🪄 How to Summon the Emporium

To bring our marketplace to life, you need only the power of Docker and a single incantation.

1.  Ensure you have Docker running on your machine.
2.  From the root of the project, chant the following spell:

    ```bash
    docker-compose up
    ```

3.  Once the spirits have settled, open your seeing glass (web browser) and navigate to `http://localhost:8080`. The emporium awaits!

## 🔮 Current State of the Realm

As of now, the emporium is partially functional:

*   **Product Discovery:** The storefront successfully summons and displays all magical items from our three merchants.
*   **Mock Checkout:** A simulated checkout process allows customers to feel the thrill of a purchase, though no real orders are yet processed.

## 🚀 Whispers of the Future: An Order-Service & Message Queues

The checkout process is but an illusion! To make it real, we propose the creation of a new, vital service:

### The Scribe's Ledger (Order Service)

To handle the sacred task of recording and processing orders, we shall summon a new service. This **Order Service** will ensure that no purchase is lost to the ether.

**Proposed Architecture:**

*   **Technology:** A Python service using **FastAPI** for the API and **Celery** for background tasks.
*   **Message Queue:** We will introduce a **RabbitMQ** instance (a trusty mechanical messenger) to our `compose.yaml`.
*   **Workflow:**
    1.  When a customer completes a checkout in the storefront, a request is sent to the new `order-service`.
    2.  The `order-service` accepts the request and immediately places the order details onto the RabbitMQ queue as a message.
    3.  A separate worker process (the "Scribe") picks up the message from the queue and processes it asynchronously. This includes saving the order to the database and perhaps sending a magical confirmation missive.

This design decouples our storefront from the order fulfillment process, making our emporium more resilient and scalable. It also adds another fascinating layer to our distributed tracing experiment!

---

Feel free to contribute your own enchantments to this ever-evolving project. May your code be clean and your traces be clear!
