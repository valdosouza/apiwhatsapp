const { Router } = require("express");
const { withJWTAuthMiddleware } = require("express-kun");
const router = Router();
const protectedRouter = withJWTAuthMiddleware(router, process.env.SECRET);
const apiEndPoint = require('../endpoint/api.endpoint')

/**
* @swagger
* components:
*   schemas:
*     Identifier:
*       type: object
*       properties:
*         tb_institution_id:
*           type: integer
*         instance_name:
*           type: string                   
*     Instance:
*       type: object
*       properties:
*         name:
*           type: string
*         result:
*           type: string
*
*     Result:
*       type: object
*       properties:
*         message:
*           type: string
*
*     Sender:
*       type: object
*       properties:
*         tb_institution_id:
*           type: integer    
*         instance_name:
*           type: string
*         numberFrom:
*           type: string
*         numberTo:
*           type: string
*         message:
*           type: string
*         type_way:
*           type: string
*/

/**
 * @swagger
 * tags:
 *   name: WhatsApp
 *   description: The State managing API
 */

/**
 * @swagger
 * /open/:
 *  post:
 *    summary: Open WhatsApp Connection
 *    tags: [WhatsApp]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Identifier' 
 *    responses:
 *      200:
 *        description: Retorna messagem
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Result'
 *      404:
 *        description: The State was not found
 *      500:
 *        description: Some error happened
 */
router.post("/open/", apiEndPoint.open);

/**
 * @swagger
 * /sender/:
 *  post:
 *    summary: Send Message
 *    tags: [WhatsApp]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Sender' 
 *    responses:
 *      200:
 *        description: Retorna messagem
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Result'
 *      404:
 *        description: The State was not found
 *      500:
 *        description: Some error happened
 */
router.post("/sender/", apiEndPoint.sender);

module.exports = router;

