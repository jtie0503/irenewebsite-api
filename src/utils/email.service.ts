import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendReservationConfirmation(
    email: string,
    customerName: string,
    contactNumber: string,
    deliveryMethod: string,
    address: string | undefined,
    dog: any,
    status: string
) {

    console.log("====================================");
    console.log("RESEND EMAIL SERVICE");
    console.log("RESEND KEY EXISTS:", !!process.env.RESEND_API_KEY);
    console.log("CUSTOMER EMAIL:", email);
    console.log("ADMIN EMAIL:", process.env.ADMIN_EMAIL);
    console.log("====================================");

    try {

        // =========================
        // CUSTOMER EMAIL
        // =========================

        const customerResult = await resend.emails.send({
            from: "Emman's Pet Shop 🐶 <onboarding@resend.dev>",
            to: email,
            subject: "Reservation Received! 🐶",
            html: `
                <div style="
                    font-family: Arial, sans-serif;
                    max-width: 650px;
                    margin: auto;
                    padding: 20px;
                ">

                    <h2 style="color: #f59e0b;">
                        Hi ${customerName}! 🐶
                    </h2>

                    <p>
                        Your puppy reservation has been received successfully.
                    </p>

                    <hr>

                    <h3>Puppy Information</h3>

                    <p>
                        <strong>Breed:</strong>
                        ${dog.breed}
                    </p>

                    <p>
                        <strong>Age:</strong>
                        ${dog.age}
                    </p>

                    <p>
                        <strong>Gender:</strong>
                        ${dog.gender}
                    </p>

                    <p>
                        <strong>Color:</strong>
                        ${dog.color}
                    </p>

                    <p>
                        <strong>Price:</strong>
                        ₱${dog.price}
                    </p>

                    <hr>

                    <h3>Reservation Details</h3>

                    <p>
                        <strong>Reservation Method:</strong>
                        ${deliveryMethod}
                    </p>

                    ${
                        deliveryMethod === "Delivery"
                            ? `
                                <p>
                                    <strong>Delivery Address:</strong>
                                    ${address || "-"}
                                </p>
                            `
                            : ""
                    }

                    <p>
                        <strong>Status:</strong>
                        ${status}
                    </p>

                    <p>
                        We will review your reservation and update you
                        once there is a change in your reservation status.
                    </p>

                    <br>

                    <p>
                        Thank you for choosing Emman's Pet Shop! 🐶
                    </p>

                </div>
            `
        });

        console.log("CUSTOMER EMAIL RESULT:");
        console.log(customerResult);

        if (customerResult.error) {
            console.error(
                "CUSTOMER EMAIL ERROR:",
                customerResult.error
            );
        } else {
            console.log(
                "CUSTOMER EMAIL SENT:",
                customerResult.data
            );
        }


        // =========================
        // ADMIN EMAIL
        // =========================

        const adminResult = await resend.emails.send({
            from: "Emman's Pet Shop 🐶 <onboarding@resend.dev>",
            to: process.env.ADMIN_EMAIL!,
            subject: `New Puppy Reservation from ${customerName}! 🐶`,
            html: `
                <div style="
                    font-family: Arial, sans-serif;
                    max-width: 650px;
                    margin: auto;
                    padding: 20px;
                ">

                    <h2 style="color: #f59e0b;">
                        New Puppy Reservation! 🐶
                    </h2>

                    <h3>Customer Information</h3>

                    <p>
                        <strong>Name:</strong>
                        ${customerName}
                    </p>

                    <p>
                        <strong>Email:</strong>
                        ${email}
                    </p>

                    <p>
                        <strong>Contact Number:</strong>
                        ${contactNumber}
                    </p>

                    <p>
                        <strong>Reservation Method:</strong>
                        ${deliveryMethod}
                    </p>

                    ${
                        deliveryMethod === "Delivery"
                            ? `
                                <p>
                                    <strong>Delivery Address:</strong>
                                    ${address || "-"}
                                </p>
                            `
                            : ""
                    }

                    <hr>

                    <h3>Puppy Information</h3>

                    <p>
                        <strong>Breed:</strong>
                        ${dog.breed}
                    </p>

                    <p>
                        <strong>Age:</strong>
                        ${dog.age}
                    </p>

                    <p>
                        <strong>Gender:</strong>
                        ${dog.gender}
                    </p>

                    <p>
                        <strong>Color:</strong>
                        ${dog.color}
                    </p>

                    <p>
                        <strong>Price:</strong>
                        ₱${dog.price}
                    </p>

                    <hr>

                    <h3>Reservation Status</h3>

                    <p>
                        <strong>Status:</strong>
                        ${status}
                    </p>

                    <br>

                    <p>
                        Login to the admin panel to review this reservation.
                    </p>

                </div>
            `
        });

        console.log("ADMIN EMAIL RESULT:");
        console.log(adminResult);

        if (adminResult.error) {
            console.error(
                "ADMIN EMAIL ERROR:",
                adminResult.error
            );
        } else {
            console.log(
                "ADMIN EMAIL SENT:",
                adminResult.data
            );
        }


        console.log("====================================");
        console.log("EMAIL SERVICE FINISHED");
        console.log("====================================");

    } catch (error) {

        console.error("EMAIL SERVICE ERROR:");
        console.error(error);

    }
}