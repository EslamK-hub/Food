-- AlterTable
CREATE SEQUENCE category_order_seq;
ALTER TABLE "Category" ALTER COLUMN "order" SET DEFAULT nextval('category_order_seq');
ALTER SEQUENCE category_order_seq OWNED BY "Category"."order";
