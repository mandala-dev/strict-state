<script lang="ts">
	import { Svelvet, Group, Node, Resizer } from 'svelvet'
    
	import { type NodeProps } from 'svelvet'

    const nodes: Array<NodeProps> = [
        {
            bgColor: "red",
            dimensions: {
                width: 400,
                height: 200
            }
        },
		{
            bgColor: "red",
            dimensions: {
                width: 400,
                height: 200
            }
        },
    ]
</script>

<div>	
<Svelvet controls width={1200} height={1000} zoom={1} minimap>
  {#each nodes as node}
      <Node {...node} />
  {/each}
</Svelvet>

	<!-- <Svelvet controls>
		<Group
			color="lightblue"
			groupName="my-group"
			position={{ x: 300, y: 400 }}
			width={600}
			height={200}
		>
			<Node let:selected dimensions={{ width: 400, height: 100 }}>
				<div class="node" class:selected>
					<Resizer width height rotation />
				</div>
			</Node>
			<Node />
		</Group>
	</Svelvet> -->
</div>

<style>
	@import url(https://fonts.googleapis.com/css?family=Rubik);

	div {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: gray;
		width: 100vw;
		height: 100vh;
		padding: 0;
		margin: 0;
	}
	.node {
		width: 100%;
		height: 100%;
		background-color: red;
		border-radius: 8px;
		border: 2px solid black;
	}
	.selected {
		border: 2px solid white;
	}
</style>
