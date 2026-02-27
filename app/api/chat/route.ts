import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma"; // adjust if path is different

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const lowerMessage = message.toLowerCase();

    
    if (lowerMessage.includes("how many") && lowerMessage.includes("product")) {
      const count = await prisma.product.count();
      return NextResponse.json({
        reply: `You have ${count} products in inventory.`,
      });
    }
  
    
    if (lowerMessage.includes("low stock")) {
      const lowStockItems = await prisma.product.findMany({
        where: {
          quantity: {
            lte: 5, // change threshold if needed
          },
        },
      });

      if (lowStockItems.length === 0) {
        return NextResponse.json({
          reply: "No products are low in stock.",
        });
      }

      const names = lowStockItems.map((p) => p.name).join(", ");

      return NextResponse.json({
        reply: `Low stock items: ${names}`,
      });
    }

    
    if (lowerMessage.includes("price of")) {
      const productName = lowerMessage.split("price of")[1]?.trim();

      const product = await prisma.product.findFirst({
        where: {
          name: {
            contains: productName,
            mode: "insensitive",
          },
        },
      });

      if (!product) {
        return NextResponse.json({
          reply: "Product not found.",
        });
      }

      return NextResponse.json({
        reply: `${product.name} costs ₹${product.price}.`,
      });
    }

    
    if (lowerMessage.includes("quantity of")) {
      const productName = lowerMessage.split("quantity of")[1]?.trim();

      const product = await prisma.product.findFirst({
        where: {
          name: {
            contains: productName,
            mode: "insensitive",
          },
        },
      });

      if (!product) {
        return NextResponse.json({
          reply: "Product not found.",
        });
      }

      return NextResponse.json({
        reply: `${product.name} has ${product.quantity} units available.`,
      });
    }

    // Default reply
    return NextResponse.json({
      reply:
        "I can help with product count, low stock items, price, or quantity. Try asking about those.",
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { reply: "Something went wrong." },
      { status: 500 }
    );
  }
}
