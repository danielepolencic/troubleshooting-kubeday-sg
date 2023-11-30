# Troubleshooting demo

Build the container image with:

```bash
docker buildx build --platform linux/arm64/v8,linux/amd64 --push -t danielepolencic/troubleshooting -f Dockerfile .
```