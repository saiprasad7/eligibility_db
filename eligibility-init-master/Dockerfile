FROM mongo:3.4

ENV MONGO_URI mongodb://admin:admin@mongo-enrollments:27017/enrollmentsDB?authSource=admin

RUN mkdir -p /enrollments-init

WORKDIR /enrollments-init

COPY . .

RUN chmod 777 entrypoint.sh

CMD ["./entrypoint.sh"]