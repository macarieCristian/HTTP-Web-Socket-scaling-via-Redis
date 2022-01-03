# HTTP & Web-Socket scaling via Redis

Simple microservices demo project regarding inter-services communication. The project provides a way of achieving scalability of `REST` servers and websockets. The scalability is achieved by means of a layer 7 load balancer `Haproxy` and also with some help from a `Redis` service. 

The project is configured to run in `Docker Containers` which can be conviniently started by using the `Docker-Compose` [configuration](https://gitlab.com/-/ide/project/cristi97.25/soa-nestjs-angular/tree/master/-/docker-compose/docker-compose.yaml). (`docker-compose up -d`)

## System Diagram

![image](https://user-images.githubusercontent.com/33750050/147920991-69bd1bb2-efdc-448d-b158-2d6392489bfe.png)
